import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val parallel by project.extra("org.gradle.parallel")
val caching by project.extra("org.gradle.caching")
val configureOnDemand by project.extra("org.gradle.configureondemand")
val buildCacheServer by project.extra("org.gradle.caching.http.enabled")

plugins {
    id("org.springframework.boot") version "3.0.1"
    id("io.spring.dependency-management") version "1.1.0"
    kotlin("jvm") version "1.7.22"
    kotlin("plugin.spring") version "1.7.22"
    kotlin("plugin.jpa") version "1.7.22"

}

group = "personal"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("io.jsonwebtoken:jjwt-root:0.11.5")
    implementation("io.springfox:springfox-swagger-ui:3.0.0")

    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}


parallel.let { isParallel ->
    tasks.withType<JavaCompile> {
        options.isFork = true
        options.forkOptions.jvmArgs?.plusAssign("-Dorg.gradle.parallel=$isParallel")
    }
}

caching.let { isCaching ->
    tasks.withType<JavaCompile> {
        options.isFork = true
        options.forkOptions.jvmArgs?.plusAssign("-Dorg.gradle.caching=$isCaching")
    }
}

configureOnDemand.let { isConfigureOnDemand ->
    tasks.withType<JavaCompile> {
        options.isFork = true
        options.forkOptions.jvmArgs?.plusAssign("-Dorg.gradle.configureondemand=$isConfigureOnDemand")
    }
}

buildCacheServer.let { isBuildCacheServer ->
    tasks.withType<JavaCompile> {
        options.isFork = true
        options.forkOptions.jvmArgs?.plusAssign("-Dorg.gradle.caching.http.enabled=$isBuildCacheServer")
    }
}