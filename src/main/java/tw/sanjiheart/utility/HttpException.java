package tw.sanjiheart.utility;

public class HttpException extends RuntimeException {

  private static final long serialVersionUID = 1L;
  private ErrorMsg errorMsg;
  private String detail;

  public HttpException(ErrorMsg error) {
    super(error.toString());
    this.errorMsg = error;
    this.detail = "";
  }

  public HttpException(ErrorMsg error, String detail) {
    super(error.toString() + detail);
    this.errorMsg = error;
    this.detail = detail;
  }

  public String getDescription() {
    if (this.errorMsg != null)
      return this.errorMsg.getDescription() + this.detail;
    else
      return new String();// return empty string
  }

  public int getCode() {
    if (this.errorMsg != null)
      return this.errorMsg.getCode();
    else
      return 0;// return empty int
  }

}
