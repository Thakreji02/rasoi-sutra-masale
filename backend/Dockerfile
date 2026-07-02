# Build stage: Compile the Spring Boot application using Maven and JDK 17 (standard Debian base)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the pom.xml and dependency files to fetch dependencies first (caching layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage: Run the built JAR in a lightweight standard JRE environment (resolves SSL/TLS alerts present in Alpine)
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the application using shell expansion to correctly parse the port from Render
CMD ["sh", "-c", "java -Dserver.port=${PORT:-5000} -Djava.security.egd=file:/dev/./urandom -jar app.jar"]
