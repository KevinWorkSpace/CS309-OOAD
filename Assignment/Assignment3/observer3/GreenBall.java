package observer3;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class GreenBall extends Ball {

    public List<Ball> ballList = new ArrayList<>();

    public GreenBall(Color color, int xSpeed, int ySpeed, int ballSize) {
        super(color, xSpeed, ySpeed, ballSize);
    }

    public void registerObserver(Ball ball) {
        ballList.add(ball);
    }

    public void notifyObservers() {
        for (Ball ball : ballList) {
            ball.update2();
        }
    }

    @Override
    public void update(char keyChar) {
        switch (keyChar) {
            case 'a':
                this.setXSpeed(Math.abs(this.getXSpeed()) * -1);
                break;
            case 'd':
                this.setXSpeed(Math.abs(this.getXSpeed()));
                break;
            case 'w':
                this.setYSpeed(Math.abs(this.getYSpeed()) * -1);
                break;
            case 's':
                this.setYSpeed(Math.abs(this.getYSpeed()));
                break;
        }
    }

    @Override
    public void update2() {}
}
