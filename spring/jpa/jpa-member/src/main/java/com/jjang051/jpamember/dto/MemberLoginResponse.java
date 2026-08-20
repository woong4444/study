package com.jjang051.jpamember.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberLoginResponse {

    private Long id;
    private String loginId;
    private String name;
    private String email;
    private String profileImage;
}
