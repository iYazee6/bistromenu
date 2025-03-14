# Stage 1: Build the Spring Boot application using Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy only the necessary files for dependency resolution first (for caching)
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copy the rest of the project files and build the application
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Create a lightweight container with only the built JAR
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port used by the Spring Boot application
EXPOSE 9898

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]