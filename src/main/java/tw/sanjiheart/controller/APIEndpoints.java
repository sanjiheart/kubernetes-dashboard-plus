package tw.sanjiheart.controller;

public interface APIEndpoints {

  public static final String API_PATH = "/api";

  public static final String CLUSTERROLES = API_PATH + "/clusterroles";
  public static final String CLUSTERROLES_NAME = CLUSTERROLES + "/{name}";
  public static final String CLUSTERROLEBINDINGS = API_PATH + "/clusterrolebindings";
  public static final String CLUSTERROLEBINDINGS_NAME = CLUSTERROLEBINDINGS + "/{name}";

  public static final String NAMESPACES = API_PATH + "/namespaces";
  public static final String NAMESPACES_NAMESPACE = NAMESPACES + "/{namespace}";
  public static final String NAMESPACES_NAMESPACE_ROLES = NAMESPACES_NAMESPACE + "/roles";
  public static final String NAMESPACES_NAMESPACE_ROLES_NAME = NAMESPACES_NAMESPACE_ROLES + "/{name}";
  public static final String NAMESPACES_NAMESPACE_ROLEBINDINGS = NAMESPACES_NAMESPACE + "/rolebindings";
  public static final String NAMESPACES_NAMESPACE_ROLEBINDINGS_NAME = NAMESPACES_NAMESPACE_ROLEBINDINGS + "/{name}";
  public static final String NAMESPACES_NAMESPACE_SERVICEACCOUNTS = NAMESPACES_NAMESPACE + "/serviceaccounts";
  public static final String NAMESPACES_NAMESPACE_SERVICEACCOUNTS_NAME = NAMESPACES_NAMESPACE_SERVICEACCOUNTS
      + "/{name}";

}
