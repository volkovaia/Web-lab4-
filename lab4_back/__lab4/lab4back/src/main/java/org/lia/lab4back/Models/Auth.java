package org.lia.lab4back.Models;

import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import org.lia.lab4back.Entities.User;
import org.lia.lab4back.Services.Encrypt;
import org.lia.lab4back.Services.UserRepository;
import org.lia.lab4back.Session.UserData;

import javax.naming.AuthenticationException;

@Stateless
public class Auth {
    @Inject
    private Encrypt encrypt;
    @Inject
    private UserRepository userRepository;
    @Inject
    private UserData userData;
    @Inject
    private PointCollection pointCollection;

    public boolean doAuth(String username, String password) {
        var user = userRepository.findByUsernameAndPassword(username, encrypt.encryptSHA512(password));
        if (user.isEmpty()) {
            return false;
        } else {
            userData.setUser(user.get());
            try {
                pointCollection.refresh();
            } catch (AuthenticationException e) {
                System.out.println("Unexpected error: " + e.getMessage());
                return false;
            }
            return true;
        }
    }

    public boolean register(String username, String password) {
        var user = new User(username, encrypt.encryptSHA512(password));
        if (userRepository.findByUsername(username).isPresent()) {
            return false;
        }
        userRepository.save(user);
        return true;
    }
    public User getUser() throws AuthenticationException {
        if(userData.getUser() == null)throw new AuthenticationException();
        return userData.getUser();
    }

    public boolean exit() {
        userData.setUser(null);
        return true;
    }
}
