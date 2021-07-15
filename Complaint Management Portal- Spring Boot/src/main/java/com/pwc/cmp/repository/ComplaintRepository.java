package com.pwc.cmp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pwc.cmp.models.Complaint;

@Repository("ComplaintRepository")
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

	List<Complaint> findAllByUserId(Long userId);
}
