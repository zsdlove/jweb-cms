import app.jweb.AbstractModule;
import app.jweb.undertow.UndertowApp;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ServiceLoader;

/**
 * @author chi
 */
public class Main {
    public static void main(String[] args) {
        Path path = Paths.get(System.getProperty("user.dir")).resolve("jweb-main/src/main/dist");
        UndertowApp app = new UndertowApp(path);
        ServiceLoader.load(AbstractModule.class).forEach(app::install);
        app.start();
    }
}
