package org.lia.lab4back.Controllers;
import jakarta.ws.rs.QueryParam;
import org.lia.lab4back.Models.Auth;
import org.lia.lab4back.Data.AuthDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/auth")
public class AuthController {
    @Inject
    private Auth auth;
    @GET
    @Path("/log")
    @Produces(MediaType.APPLICATION_JSON)
    public AuthDTO login(@QueryParam("username") String username, @QueryParam("password") String password) {
        if(username==null || username.isEmpty() || password == null || password.isEmpty())return new AuthDTO(false);
        return new AuthDTO(auth.doAuth(username, password));
    }
    @GET
    @Path("/reg")
    @Produces(MediaType.APPLICATION_JSON)
    public AuthDTO register(@QueryParam("username") String username, @QueryParam("password") String password) {
        if(username==null || username.isEmpty() || password == null || password.isEmpty())return new AuthDTO(false);
        return new AuthDTO(auth.register(username, password));
    }
    @GET
    @Path("/exit")
    @Produces(MediaType.APPLICATION_JSON)
    public AuthDTO exit() {
        return new AuthDTO(auth.exit());
    }
}
