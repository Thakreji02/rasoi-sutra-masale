import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Calendar, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/v1/orders/my-orders');
        setOrders(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch user orders', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED': return 'bg-green-50 text-green-700 border-green-200';
      case 'PROCESSING': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'SHIPPED': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-10 h-10 border-4 border-amber-900/10 border-l-[#991B1B] rounded-full animate-spin"></div>
        <p className="text-amber-950/60 font-bold text-xs uppercase tracking-wider">Fetching your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-extrabold text-[#451A03]">Your Order History</h2>
        <p className="text-amber-900/60 text-sm mt-1">Review your past orders and tracking statuses.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#FAF6F0] rounded-3xl border border-amber-900/10 p-12 text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#991B1B]">
            <ShoppingBag size={28} />
          </div>
          <h3 className="text-lg font-bold text-amber-950">No Orders Found</h3>
          <p className="text-amber-950/60 text-xs mt-1 max-w-sm mx-auto">
            You haven't placed any orders yet. Visit our shop and select your favorite premium spices!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            return (
              <div 
                key={order.id}
                className="bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order Summary Header */}
                <div 
                  onClick={() => toggleExpand(order.id)}
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-amber-50/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50/50 text-[#78350F] rounded-full flex items-center justify-center border border-amber-900/5">
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-[#451A03]">Order #{order.id}</span>
                        <span className={`text-[0.65rem] font-extrabold px-2 py-0.5 rounded-full border ${getStatusClass(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-amber-950/50 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(order.orderDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </span>
                        <span>•</span>
                        <span>{order.orderedItems?.length || 0} Items</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-4 sm:pt-0">
                    <div className="sm:text-right">
                      <span className="text-xs text-amber-950/50 block">Total Amount</span>
                      <span className="text-lg font-extrabold text-[#991B1B]">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="text-amber-950/60">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="border-t border-amber-900/5 bg-amber-50/10 p-6 space-y-6">
                    {/* Item list */}
                    <div>
                      <h4 className="text-xs font-extrabold text-amber-950/60 uppercase tracking-wider mb-3">Items Ordered</h4>
                      <div className="divide-y divide-amber-900/5">
                        {order.orderedItems?.map((item, index) => (
                          <div key={index} className="py-3 flex items-center justify-between text-sm">
                            <div>
                              <span className="font-bold text-[#451A03]">{item.name}</span>
                              <span className="text-xs text-amber-950/50 ml-2">({item.weightSelected})</span>
                            </div>
                            <div className="text-amber-950/70 font-semibold">
                              {item.quantity} × <span className="text-[#991B1B] font-bold">₹{item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery & Payment details grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-amber-900/5 pt-6 text-sm">
                      <div>
                        <h4 className="text-xs font-extrabold text-amber-950/60 uppercase tracking-wider mb-2">Delivery Address</h4>
                        <p className="font-bold text-[#451A03]">{order.customerName}</p>
                        <p className="text-amber-950/70 text-xs mt-0.5">{order.address}, {order.city}</p>
                        <p className="text-amber-950/70 text-xs">{order.state} - {order.pincode}</p>
                        <p className="text-amber-950/70 text-xs mt-1">Mobile: {order.mobile}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold text-amber-950/60 uppercase tracking-wider mb-2">Payment Details</h4>
                        <div className="space-y-1 text-xs text-amber-950/70">
                          <p className="flex items-center gap-1.5 font-bold text-[#451A03]">
                            <CreditCard size={14} />
                            Method: {order.paymentMethod}
                          </p>
                          <p>Status: <span className="font-bold uppercase text-amber-950/90">{order.paymentStatus}</span></p>
                          {order.transactionId && <p>Transaction ID: <span className="font-mono text-[0.7rem] bg-amber-50 px-1 py-0.5 rounded border border-amber-950/5">{order.transactionId}</span></p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
