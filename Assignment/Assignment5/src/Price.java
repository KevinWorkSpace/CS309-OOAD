
public abstract class Price {

	public Price() {
		super();
	}

	public abstract int getPriceCode();
	
	abstract double getCharge(int daysRented);

	int getFrequentRenterPoints(int daysRented) {
		// add frequent renter points
		int frequentRenterPoints = 0;
		frequentRenterPoints ++;
		return frequentRenterPoints;
	}

}