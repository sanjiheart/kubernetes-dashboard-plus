package tw.sanjiheart.model;

import java.util.List;

import com.google.common.collect.Lists;

public class ResourceList<T> {

  private long total;
  private List<T> resources = Lists.newArrayList();

  public ResourceList() {}

  public ResourceList(long total, List<T> resources) {
    this.total = total;
    this.resources = resources;
  }

  public long getTotal() {
    return total;
  }

  public void setTotal(long total) {
    this.total = total;
  }

  public List<T> getResources() {
    return resources;
  }

  public void setResources(List<T> resources) {
    this.resources = resources;
  }

  @Override
  public String toString() {
    return "ResourceCollection [total=" + total + ", resources=" + resources + "]";
  }

}
