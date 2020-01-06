package observer3;

import java.awt.*;

public class BlueBall extends Ball {

    public GreenBall greenBall;

    public BlueBall(Color color, int xSpeed, int ySpeed, int ballSize) {
        super(color, xSpeed, ySpeed, ballSize);
    }

    @Override
    public void update(char keyChar) {
        this.setXSpeed(-1 * this.getXSpeed());
        this.setYSpeed(-1 * this.getYSpeed());
    }

    @Override
    public void update2() {
        int diffX = this.getX() - greenBall.getX();
        int diffY = this.getY() - greenBall.getY();
        if(diffX * diffX + diffY * diffY < 120 * 120) {
            if(greenBall.getX() > this.getX()) {
                this.setX(this.getX() - 30);
            }
            else {
                this.setX(this.getX() + 30);
            }
            if(greenBall.getY() > this.getY()) {
                this.setY(this.getY() - 30);
            }
            else {
                this.setY(this.getY() + 30);
            }
        }
    }
}
