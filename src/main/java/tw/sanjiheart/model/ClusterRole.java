package tw.sanjiheart.model;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;

import io.kubernetes.client.models.V1ClusterRole;
import io.kubernetes.client.models.V1PolicyRule;

public class ClusterRole {

  private String name;
  private OffsetDateTime creationTime;
  private Map<String, String> labels;
  private Map<String, String> annotations;
  private List<V1PolicyRule> rules;

  public ClusterRole(V1ClusterRole v1ClusterRole) {
    this.name = v1ClusterRole.getMetadata().getName();
    this.creationTime = OffsetDateTime.ofInstant(
        Instant.ofEpochMilli(v1ClusterRole.getMetadata().getCreationTimestamp().getMillis()), ZoneId.of("+0"));
    this.labels = v1ClusterRole.getMetadata().getLabels();
    this.annotations = v1ClusterRole.getMetadata().getAnnotations();
    this.rules = v1ClusterRole.getRules();
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

  public Map<String, String> getAnnotations() {
    return annotations;
  }

  public void setAnnotations(Map<String, String> annotations) {
    this.annotations = annotations;
  }

  public List<V1PolicyRule> getRules() {
    return rules;
  }

  public void setRules(List<V1PolicyRule> rules) {
    this.rules = rules;
  }

}
