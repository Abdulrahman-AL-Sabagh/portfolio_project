import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.bundling.BootJar

val parallel by project.extra("org.gradle.parallel")
val caching by project.extra("org.gradle.caching")
val configureOnDemand by project.extra("org.gradle.configureondemand")
val buildCacheServer by project.extra("org.gradle.caching.http.enabled")


plugins {
    id("org.springframework.boot") version "3.0.1"
    id("io.spring.dependency-management") version "1.1.0"
    id("java")
    kotlin("jvm") version "1.7.22"
    kotlin("plugin.spring") version "1.7.22"
    kotlin("plugin.jpa") version "1.7.22"
}

group = "personal"
version = "0.0.1-SNAPSHOT"

java.sourceCompatibility = JavaVersion.VERSION_19

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-jackson:0.11.5")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-test")

}

tasks.getByName<Jar>("jar") {
    enabled = false
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

tasks.withType<BootJar> {
}
tasks.withType<Jar> {

}
tasks.withType<JavaCompile> {
    options.isIncremental = true
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
