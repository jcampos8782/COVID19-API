FROM amazoncorretto:11 as build
WORKDIR /Bld

RUN yum install maven -y

COPY src/ src/
COPY pom.xml .

RUN mvn install package

FROM amazoncorretto:11 as runtime
WORKDIR /App
COPY --from=build /Bld/target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
