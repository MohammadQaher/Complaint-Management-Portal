package com.pwc.cmp;

import java.security.Principal;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.pwc.cmp.security.services.UserDetailsImpl;

public final class PrincipalUtil {

	private PrincipalUtil() {
	}

	public static UserDetailsImpl parse(Principal principal) {
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
		return (UserDetailsImpl) token.getPrincipal();
	}
}
