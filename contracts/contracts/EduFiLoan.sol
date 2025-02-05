// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IZkIncomeVerification {
    function hasSubmittedValidProof(address user) external view returns (bool);
}

contract EduFiLoan {
    // State variables
    IZkIncomeVerification public immutable zkVerification;
    uint256 public nextLoanId;
    
    struct LoanApplication {
        address borrower;
        uint256 loanAmount;
        uint256 duration;
        uint256 timestamp;
        bool isApproved;
        bool isFunded;
        address lender;
        string purpose;
    }
    
    // Mappings
    mapping(uint256 => LoanApplication) public loans;
    mapping(address => uint256[]) public userLoans;
    
    // Events
    event LoanApplicationCreated(uint256 indexed loanId, address indexed borrower, uint256 amount);
    event LoanFunded(uint256 indexed loanId, address indexed lender);
    
    // Constructor
    constructor(address _zkVerification) {
        zkVerification = IZkIncomeVerification(_zkVerification);
    }
    
    // Core functions
    function applyForLoan(uint256 amount, uint256 duration, string calldata purpose) external {
        require(zkVerification.hasSubmittedValidProof(msg.sender), "Income not verified");
        require(amount > 0, "Amount must be greater than 0");
        require(duration >= 1 && duration <= 60, "Duration must be between 1-60 months");
        require(bytes(purpose).length > 0, "Purpose required");
        
        uint256 loanId = nextLoanId++;
        
        loans[loanId] = LoanApplication({
            borrower: msg.sender,
            loanAmount: amount,
            duration: duration,
            timestamp: block.timestamp,
            isApproved: true,
            isFunded: false,
            lender: address(0),
            purpose: purpose
        });
        
        userLoans[msg.sender].push(loanId);
        emit LoanApplicationCreated(loanId, msg.sender, amount);
    }
    
    function fundLoan(uint256 loanId) external payable {
        LoanApplication storage loan = loans[loanId];
        require(loan.borrower != address(0), "Loan does not exist");
        require(!loan.isFunded, "Already funded");
        require(msg.value == loan.loanAmount, "Incorrect amount");
        require(loan.isApproved, "Loan not approved");
        require(msg.sender != loan.borrower, "Cannot fund own loan");
        
        loan.isFunded = true;
        loan.lender = msg.sender;
        
        payable(loan.borrower).transfer(msg.value);
        emit LoanFunded(loanId, msg.sender);
    }
    
    // View functions
    function getLoanDetails(uint256 loanId) external view returns (LoanApplication memory) {
        require(loans[loanId].borrower != address(0), "Loan does not exist");
        return loans[loanId];
    }
    
    function getUserLoans(address user) external view returns (uint256[] memory) {
        return userLoans[user];
    }
}