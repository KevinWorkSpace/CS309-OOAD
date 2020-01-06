package observer3;

import sun.awt.windows.WPrinterJob;

import java.awt.*;

public class RedBall extends Ball
{
    public GreenBall greenBall;

    public RedBall(Color color, int xSpeed, int ySpeed, int ballSize) {
        super(color, xSpeed, ySpeed, ballSize);
    }

    @Override
    public void update(char keyChar) {
        if (keyChar == 'a' || keyChar == 'd') {
            int temp = this.getXSpeed();
            this.setXSpeed(this.getYSpeed());
            this.setYSpeed(temp);
        }
    }

    @Override
    public void update2() {
        int diffX = this.getX() - greenBall.getX();
        int diffY = this.getY() - greenBall.getY();
        if(diffX * diffX + diffY * diffY < 100 * 100) {
            if(greenBall.getX() > this.getX()) {
                this.setX(this.getX() - 50);
            }
            else {
                this.setX(this.getX() + 50);
            }
            if(greenBall.getY() > this.getY()) {
                this.setY(this.getY() - 50);
            }
            else {
                this.setY(this.getY() + 50);
            }
        }
    }
}
