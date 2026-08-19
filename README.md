# Study

개발 공부 및 실습 내용을 정리하는 저장소입니다.

## Spring

### JPA

#### JPA 회원가입 실습

React에서 회원가입 정보를 입력하고,
Spring Boot + Spring Data JPA를 통해 Oracle DB에 저장하는 기능을 구현했습니다.

### 처리 흐름

React  
→ Controller  
→ DTO  
→ Service  
→ Repository  
→ JPA / Hibernate  
→ Oracle

### MyBatis와 JPA 차이

| MyBatis              | JPA                   |
| -------------------- | --------------------- |
| SQL을 직접 작성      | 기본 SQL을 JPA가 생성 |
| Mapper.xml 사용      | Repository 사용       |
| SQL 중심             | Entity 중심           |
| INSERT SQL 직접 작성 | save() 사용           |
| SQL 제어가 쉬움      | 반복 CRUD 코드가 적음 |

### 실습 코드

- `spring/jpa/jpa-member` : Spring Boot + JPA 백엔드
- `spring/jpa/jpa-member-front` : React 회원가입 프론트
