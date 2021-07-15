package com.pwc.cmp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pwc.cmp.models.Role;

@Repository("RoleRepository")
public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByCode(String code);
}
