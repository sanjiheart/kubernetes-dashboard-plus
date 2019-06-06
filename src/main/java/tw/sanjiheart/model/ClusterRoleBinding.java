package tw.sanjiheart.model;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;

import io.kubernetes.client.models.V1ClusterRoleBinding;
import io.kubernetes.client.models.V1RoleRef;
import io.kubernetes.client.models.V1Subject;

public class ClusterRoleBinding {

  private String name;
  private OffsetDateTime creationTime;
  private Map<String, String> labels;
  private Map<String, String> annotations;
  private List<V1Subject> subjects;
  private V1RoleRef roleRef;

  public ClusterRoleBinding(V1ClusterRoleBinding v1ClustedrRoleBinding) {
    this.name = v1ClustedrRoleBinding.getMetadata().getName();
    this.creationTime = OffsetDateTime.ofInstant(
        Instant.ofEpochMilli(v1ClustedrRoleBinding.getMetadata().getCreationTimestamp().getMillis()), ZoneId.of("+0"));
    this.labels = v1ClustedrRoleBinding.getMetadata().getLabels();
    this.annotations = v1ClustedrRoleBinding.getMetadata().getAnnotations();
    this.subjects = v1ClustedrRoleBinding.getSubjects();
    this.roleRef = v1ClustedrRoleBinding.getRoleRef();
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

  public List<V1Subject> getSubjects() {
    return subjects;
  }

  public void setSubjects(List<V1Subject> subjects) {
    this.subjects = subjects;
  }

  public V1RoleRef getRoleRef() {
    return roleRef;
  }

  public void setRoleRef(V1RoleRef roleRef) {
    this.roleRef = roleRef;
  }

}
