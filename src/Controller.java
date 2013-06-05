import java.io.IOException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class Controller extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println(req.getParameter("accessToken"));
	}
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println(req.getParameter("accessToken"));
	}
}
