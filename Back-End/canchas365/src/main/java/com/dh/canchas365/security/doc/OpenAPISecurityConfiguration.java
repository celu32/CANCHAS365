package com.dh.canchas365.security.doc;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info =@Info(
                title = "Canchas 365 API",
                version = "${api.version}",
                contact = @Contact(
                        name = "Grupo 1", email = "aciarenator@gmail.com"
                ),
//                license = @License(
//                        name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"
//                ),
//                termsOfService = "${tos.uri}",
                description = "${api.description}"
        ),
        servers = @Server(
                url = "${api.server.url}",
                description = "Produccion"
        )
)
public class OpenAPISecurityConfiguration {}
