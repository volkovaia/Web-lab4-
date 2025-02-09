package org.lia.lab4back.Data;

import java.io.Serializable;

public class AuthDTO implements Serializable
{
    public AuthDTO(){

    }
    public AuthDTO(boolean success){
        this.success = success;
    }
    private boolean success;

    public boolean isSuccess() {
        return success;
    }
}
