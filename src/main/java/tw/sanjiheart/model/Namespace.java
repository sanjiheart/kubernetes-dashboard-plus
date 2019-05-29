package tw.sanjiheart.model;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.Map;

import io.kubernetes.client.models.V1Namespace;

public class Namespace {

  private String name;
  private OffsetDateTime creationTime;
  private Map<String, String> labels;
  private String status;

  public Namespace(V1Namespace v1Namespace) {
    this.name = v1Namespace.getMetadata().getName();
    this.creationTime = OffsetDateTime
        .ofInstant(Instant.ofEpochMilli(v1Namespace.getMetadata().getCreationTimestamp().getMillis()), ZoneId.of("+0"));
    this.labels = v1Namespace.getMetadata().getLabels();
    this.status = v1Namespace.getStatus().getPhase();
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public OffsetDateTime getCreationTime() {
    return creationTime;
  }

  public void setCreationTime(OffsetDateTime creationTime) {
    this.creationTime = creationTime;
  }

  public Map<String, String> getLabels() {
    return labels;
  }

  public void setLabels(Map<String, String> labels) {
    this.labels = labels;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

}
