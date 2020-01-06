
public class NewReleasePrice extends Price {
	public int getPriceCode() {
		return Movie.NEW_RELEASE;
	}

	double getCharge(int daysRented) {
		//determine amounts for each line
		double result = 0;
		result += daysRented * 3;
		return result;
	}
	
	@Override
	int getFrequentRenterPoints(int daysRented) {
		// add frequent renter points
		int frequentRenterPoints = 0;
		frequentRenterPoints ++;
		// add bonus for a two day new release rental
		if (daysRented > 1) frequentRenterPoints++;
		return frequentRenterPoints;
	}

	
}