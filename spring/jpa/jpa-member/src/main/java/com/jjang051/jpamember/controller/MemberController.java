package com.jjang051.jpamember.controller;


import com.jjang051.jpamember.dto.MemberJoinRequest;
import com.jjang051.jpamember.dto.MemberLoginRequest;
import com.jjang051.jpamember.dto.MemberLoginResponse;
import com.jjang051.jpamember.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<String> join(
            @Valid
            @RequestBody

            MemberJoinRequest request
            ) {
        memberService.join(request);

        return  ResponseEntity.ok("회원가입 성공");   //JSON 회원가입

    }

    @PostMapping("/form-data")
    public ResponseEntity<String> joinFormData(
            @Valid
            @ModelAttribute

            MemberJoinRequest request
    ) {
        memberService.join(request);

        return ResponseEntity.ok("FormData 회원가입 성공");
    }

    @GetMapping("/check-loginid")
    public Map<String,Boolean> checkLoginId(
            @RequestParam String loginId
    ) {
        boolean exists = memberService.existsLoginId(loginId);

        return Map.of(
                "available",
                !exists
        );
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody MemberLoginRequest request
            ) {
        memberService.login(request);

        return ResponseEntity.ok("로그인 성공");
    }
    @PostMapping("/login-response")
    public ResponseEntity<MemberLoginResponse> loginWithResponse(
            @RequestBody MemberLoginRequest request
    ) {
        MemberLoginResponse response =
                memberService.loginWithResponse(request);

        return ResponseEntity.ok(response);
    }

}
