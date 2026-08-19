package com.jjang051.jpamember.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "APP_MEMBER")
@Getter
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "app_member_seq_generator"
    )

    @SequenceGenerator(
            name = "app_member_seq_generator",
            sequenceName = "APP_MEMBER_SEQ",
            allocationSize = 1
    )
    @Column(name = "MEMBER_ID")
    private Long id;

    @Column(
            name = "LOGIN_ID",
            nullable = false,
            unique = true,
            length = 50
    )
    private String loginId;

    @Column(
            name = "PASSWORD",
            nullable = false
    )
    private String password;

    @Column(
            name = "NAME",
            nullable = false,
            length = 50
    )
    private String name;

    @Column(
            name="EMAIL",
            nullable = false,
            unique = true,
            length = 100
    )
    private String email;

    public Member(
            String loginId,
            String password,
            String name,
            String email
    ) {
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.email = email;
    }
}

