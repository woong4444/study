package com.jjang051.jpamember.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberLoginRequest {


    private String loginId;
    private String password;

}
