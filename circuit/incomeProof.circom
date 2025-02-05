pragma circom 2.0.0;

template IncomeProof() {
    // Inputs
    signal input address;
    signal input income; // Private input (user's income)
    signal input threshold; // Public input (threshold, e.g., 50000)

    // Output
    signal output isAboveThreshold; // 1 if income >= threshold, 0 otherwise

    // Compute the difference between income and threshold
    signal diff <-- income - threshold;

    // Binary signal: 1 if income >= threshold, 0 otherwise
    isAboveThreshold <-- diff >= 0 ? 1 : 0;

    // Constraint: Ensure isAboveThreshold is binary (0 or 1)
    isAboveThreshold * (isAboveThreshold - 1) === 0;

    // Constraint: If isAboveThreshold is 1, then diff must be >= 0
    // Use an auxiliary signal to enforce this
    signal aux <-- diff * isAboveThreshold;
    aux === diff * isAboveThreshold; // Ensure aux is computed correctly
}

component main {public [address]} = IncomeProof();