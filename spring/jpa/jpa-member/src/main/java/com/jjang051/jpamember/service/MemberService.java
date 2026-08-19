package com.jjang051.jpamember.service;


import com.jjang051.jpamember.dto.MemberJoinRequest;
import com.jjang051.jpamember.entity.Member;
import com.jjang051.jpamember.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void join(MemberJoinRequest request) {
        if(
                memberRepository
                        .findByLoginId(request.getLoginId())
                        .isPresent()
        ) {
            throw new IllegalArgumentException(
                    "이미 사용 중인 아이디입니다."
            );
        }
        if(
                memberRepository
                        .findByEmail(request.getEmail())
                        .isPresent()
        ) {
            throw new IllegalArgumentException(
                    "이미 사용 중인 이메일입니다."
            );
        }

        Member member = new Member(
                request.getLoginId(),
                request.getPassword(),
                request.getName(),
                request.getEmail()
        );

        memberRepository.save(member);
    }
}
