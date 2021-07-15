package com.pwc.cmp.service;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.pwc.cmp.PrincipalUtil;
import com.pwc.cmp.models.CacheType;
import com.pwc.cmp.models.Complaint;
import com.pwc.cmp.repository.ComplaintRepository;
import com.pwc.cmp.security.services.UserDetailsImpl;

@Service("ComplaintService")
public class ComplaintService {

	@Autowired
	private ComplaintRepository repo;

	public ComplaintRepository getRepository() {
		return repo;
	}

	@Cacheable(value = CacheType.Complaint, key = "'" + CacheType.Complaint + "'")
	public List<Complaint> getAllComplaints() {
		return getRepository().findAll();
	}

	public List<Complaint> getAllComplaintsByUserId(Long userId) {
		return getRepository().findAllByUserId(userId);
	}

	public Complaint getComplaintByUserId(Long id) {
		return getRepository().findById(id).get();
	}

	@CacheEvict(value = CacheType.Complaint, allEntries = true)
	public Complaint createComplaint(Complaint complaint, Principal principal) {
		UserDetailsImpl userDetails = PrincipalUtil.parse(principal);
		complaint.setUserId(userDetails.getId());
		return getRepository().saveAndFlush(complaint);
	}

	@CacheEvict(value = CacheType.Complaint, allEntries = true)
	public Complaint updateComplaint(Complaint complaint) {
		if (complaint == null) {
			throw new IllegalStateException(
					"Complaint not found!");
		}
		return getRepository().saveAndFlush(complaint);
	}

	@CacheEvict(value = CacheType.Complaint, allEntries = true)
	public void deleteComplaintById(Long id) {
		Complaint complaint = getRepository().findById(id).get();

		if (complaint == null) {
			throw new IllegalStateException(
					"Complaint not found for this id :: " + id);
		}
		getRepository().delete(complaint);
	}

}