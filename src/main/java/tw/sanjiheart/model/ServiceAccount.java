package tw.sanjiheart.model;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.List;

import io.kubernetes.client.models.V1ObjectReference;
import io.kubernetes.client.models.V1ServiceAccount;

public class ServiceAccount {

  private String name;
  private String namespace;
  private OffsetDateTime creationTime;
  private List<V1ObjectReference> secrets;

  public ServiceAccount(V1ServiceAccount v1ServiceAccount) {
    this.name = v1ServiceAccount.getMetadata().getName();
    this.namespace = v1ServiceAccount.getMetadata().getNamespace();
    this.creationTime = OffsetDateTime.ofInstant(
        Instant.ofEpochMilli(v1ServiceAccount.getMetadata().getCreationTimestamp().getMillis()), ZoneId.of("+0"));
    this.secrets = v1ServiceAccount.getSecrets();
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getNamespace() {
    return namespace;
  }

  public void setNamespace(String namespace) {
    this.namespace = namespace;
  }

  public OffsetDateTime getCreationTime() {
    return creationTime;
  }

  public void setCreationTime(OffsetDateTime creationTime) {
    this.creationTime = creationTime;
  }

  public List<V1ObjectReference> getSecrets() {
    return secrets;
  }

  public void setSecrets(List<V1ObjectReference> secrets) {
    this.secrets = secrets;
  }

}
