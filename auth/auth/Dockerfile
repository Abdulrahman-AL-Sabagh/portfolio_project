FROM gradle:7.5.1-alpine as builder
COPY . /app
WORKDIR /app
RUN ./gradlew build -x test
WORKDIR /app/build/libs
RUN mv $(ls . | grep SNAPSHOT.jar) application.jar


FROM openjdk:19-alpine
COPY --from=builder /app/build/libs/application.jar ./application.jar
RUN find . | grep .jar
ENTRYPOINT ["java", "-jar", "application.jar"]