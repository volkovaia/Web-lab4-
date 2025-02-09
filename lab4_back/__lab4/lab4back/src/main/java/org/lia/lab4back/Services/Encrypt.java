package org.lia.lab4back.Services;



import jakarta.ejb.Singleton;

import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Singleton
public class Encrypt implements Serializable {
    private final String salt = "abcdef";
    public String encryptSHA512(String plainText) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt.getBytes(StandardCharsets.UTF_8));
            byte[] hashedPassword = md.digest(plainText.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hashedPassword);
        }
        catch (NoSuchAlgorithmException e) {
            return null;
        }
    }
    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
