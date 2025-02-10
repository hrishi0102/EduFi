// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EduFiInstitutions {
    struct Institution {
        string name;
        address payable accountAddress;
        bool isVerified;
        string website;
        uint256 registrationDate;
    }
    
    // State variables
    mapping(address => Institution) public institutions;
    mapping(address => bool) public admins;
    address public owner;
    
    // Events
    event InstitutionRegistered(address indexed institution, string name);
    event InstitutionVerified(address indexed institution);
    
    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true;
    }
    
    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admin can perform this action");
        _;
    }
    
    function registerInstitution(
        string memory name,
        string memory website
    ) external {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(institutions[msg.sender].registrationDate == 0, "Already registered");
        
        institutions[msg.sender] = Institution({
            name: name,
            accountAddress: payable(msg.sender),
            isVerified: false,
            website: website,
            registrationDate: block.timestamp
        });
        
        emit InstitutionRegistered(msg.sender, name);
    }
    
    function verifyInstitution(address institutionAddress) external onlyAdmin {
        require(institutions[institutionAddress].registrationDate != 0, "Institution not registered");
        institutions[institutionAddress].isVerified = true;
        emit InstitutionVerified(institutionAddress);
    }
    
    function isInstitutionVerified(address institution) external view returns (bool) {
        return institutions[institution].isVerified;
    }
    
    function getInstitution(address institution) external view returns (Institution memory) {
        return institutions[institution];
    }
}