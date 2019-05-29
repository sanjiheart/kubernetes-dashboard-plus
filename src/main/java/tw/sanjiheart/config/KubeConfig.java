package tw.sanjiheart.config;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.kubernetes.client.ApiClient;
import io.kubernetes.client.apis.CoreV1Api;
import io.kubernetes.client.apis.RbacAuthorizationV1Api;
import io.kubernetes.client.util.Config;

@Configuration
public class KubeConfig {

  @Value("${kube.url}")
  private String url;

  @Value("${kube.token}")
  private String token;

  @PostConstruct
  public void init() {
    //  ApiClient client = Config.defaultClient();
    ApiClient client = Config.fromToken(url, token);
    io.kubernetes.client.Configuration.setDefaultApiClient(client);
  }

  @Bean
  public RbacAuthorizationV1Api rbacAuthorizationApi() {
    return new RbacAuthorizationV1Api();
  }

  @Bean
  public CoreV1Api coreApi() {
    return new CoreV1Api();
  }

}
