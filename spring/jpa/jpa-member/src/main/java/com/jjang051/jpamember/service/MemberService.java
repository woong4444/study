package com.jjang051.jpamember.service;


import com.jjang051.jpamember.dto.MemberJoinRequest;
import com.jjang051.jpamember.entity.Member;
import com.jjang051.jpamember.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

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

        String savedFileName = null;

        MultipartFile profile = request.getProfile();

        if(profile !=null && !profile.isEmpty()) {

            String uploadPath = "C:/upload/jpa-member";

            File uploadDir = new File(uploadPath);

            if(!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String originalFileName = profile.getOriginalFilename();

            String ext = "";

            if(originalFileName != null && originalFileName.contains(".")) {
                ext= originalFileName.substring(
                        originalFileName.lastIndexOf(".")
                );
            }

            savedFileName = UUID.randomUUID().toString() +ext;

            File saveFile = new File(uploadPath, savedFileName);

            try {
                profile.transferTo(saveFile);
            } catch (IOException e) {
                throw new RuntimeException("프로필 이미지 저장 실패");
            }
        }

        Member member = new Member(
                request.getLoginId(),
                request.getPassword(),
                request.getName(),
                request.getEmail(),
                savedFileName
        );

        memberRepository.save(member);

        memberRepository.save(member);
    }
}
