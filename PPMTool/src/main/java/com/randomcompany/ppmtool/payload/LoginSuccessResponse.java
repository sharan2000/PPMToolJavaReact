package com.randomcompany.ppmtool.payload;

public class LoginSuccessResponse {
	private boolean success;
	private String token;

	public LoginSuccessResponse(boolean success, String token) {
		this.success = success;
		this.token = token;
	}
	
	public boolean getSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
}
