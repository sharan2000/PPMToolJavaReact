package com.randomcompany.ppmtool.security;

public class SecurityConstants {
	public static final String SIGN_UP_URLS = "/api/users/**";
    public static final String SECRET ="KTUJKYv6uYJL3JJMTrMi19I0+HUnZhkpw3hIAnf4VPS54iWpuh3ei45l+gbUIKiHQE87M2jKOaBYB56JuKmcxw=="; //64 bytes long secretkey which is a string that is base64 encoded
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 86400000;  // 24 hours
}
