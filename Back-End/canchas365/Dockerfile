ARG APPLICATION_NAME=canchas365

# Development Stage
FROM openjdk:17-jdk-alpine as development
ARG APPLICATION_NAME
WORKDIR /app/$APPLICATION_NAME

# Copy the necessary files
COPY ./pom.xml /app
COPY ./.mvn ./.mvn
COPY ./mvnw .
COPY ./pom.xml .

# Install dos2unix and convert mvnw to Unix format
RUN apk update && apk add dos2unix
RUN dos2unix mvnw

# Execute the Maven build
RUN ./mvnw clean package -Dmaven.test.skip -Dmaven.main.skip -Dspring-boot.repackage.skip && rm -r ./target/

# Copy the source code
COPY ./src ./src

# Build the application agan
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk-alpine
ARG APPLICATION_NAME

ARG TARGET_FOLDER=./app/$APPLICATION_NAME/target
COPY --from=development $TARGET_FOLDER/canchas365-0.0.1-SNAPSHOT.jar .
ARG PORT_APP=8080
ENV PORT $PORT_APP
EXPOSE $PORT
# LASD VARIABLES DE AMBIENTE AL SER UTILIZADAS VAN CON $

CMD ["java","-jar","canchas365-0.0.1-SNAPSHOT.jar"]