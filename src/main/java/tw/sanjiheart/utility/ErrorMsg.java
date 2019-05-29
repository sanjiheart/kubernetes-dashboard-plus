package tw.sanjiheart.utility;

public enum ErrorMsg {

  BAD_REQUEST(400, ""), 
  UNAUTHORIZED(401, ""), 
  FORBIDDEN(403, ""), 
  NOT_FOUND(404, ""), 
  CONFLICT(409, ""), 
  SERVICE_UNAVAILABLE(503, "");

  private final int code;
  private final String description;

  private ErrorMsg(int code, String description) {
    this.code = code;
    this.description = description;
  }

  public int getCode() {
    return code;
  }

  public String getDescription() {
    return description;
  }

}
