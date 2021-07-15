package com.pwc.cmp.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pwc.cmp.models.Complaint;
import com.pwc.cmp.service.ComplaintService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/services")
public class ComplaintController {

	@Autowired
	private ComplaintService complaintService;

	//Get all complaints
	@PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(value = "/getAllComplaints", method = RequestMethod.POST)
	public ResponseEntity<List<Complaint>> getAllComplaints() {
		return new ResponseEntity<List<Complaint>>(complaintService.getAllComplaints(), HttpStatus.OK);
	}

	//Create complaint
	@PreAuthorize("hasAuthority('USER')")
	@RequestMapping(value = "/createComplaint", method = RequestMethod.POST)
	public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint, Principal principal) {
		return new ResponseEntity<Complaint>(complaintService.createComplaint(complaint, principal), HttpStatus.OK);
	}

	//Get complaints by user ID
	@PreAuthorize("hasAuthority('USER')")
	@RequestMapping(value = "/getAllComplaintsByUserId", method = RequestMethod.POST)
	public ResponseEntity<List<Complaint>> getAllComplaintsByUserId(@RequestBody Long userId) {
		return new ResponseEntity<List<Complaint>>(complaintService.getAllComplaintsByUserId(userId), HttpStatus.OK);
	}

	//Update complaints
	@RequestMapping(value = "/updateComplaint", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Complaint> updateComplaint(@RequestBody Complaint complaint) {
		return new ResponseEntity<Complaint>(complaintService.updateComplaint(complaint), HttpStatus.OK);
	}

	//Delete complaints by ID
	@PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(value = "/deleteComplaintById", method = RequestMethod.POST)
	public ResponseEntity<Void> deleteComplaintById(@RequestBody Long id) {
		complaintService.deleteComplaintById(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
