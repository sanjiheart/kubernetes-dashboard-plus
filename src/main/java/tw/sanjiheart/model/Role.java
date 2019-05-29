package tw.sanjiheart.model;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;

import io.kubernetes.client.models.V1PolicyRule;
import io.kubernetes.client.models.V1Role;

public class Role {

  private String name;
  private String namespace;
  private OffsetDateTime creationTime;
  private Map<String, String> labels;
  private Map<String, String> annotations;
  private List<V1PolicyRule> rules;

  public Role(V1Role v1Role) {
    this.name = v1Role.getMetadata().getName();
    this.namespace = v1Role.getMetadata().getNamespace();
    this.creationTime = OffsetDateTime
        .ofInstant(Instant.ofEpochMilli(v1Role.getMetadata().getCreationTimestamp().getMillis()), ZoneId.of("+0"));
    this.labels = v1Role.getMetadata().getLabels();
    this.annotations = v1Role.getMetadata().getAnnotations();
    this.rules = v1Role.getRules();
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
