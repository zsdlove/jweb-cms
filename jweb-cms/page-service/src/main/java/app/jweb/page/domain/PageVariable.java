package app.jweb.page.domain;


import app.jweb.page.api.variable.VariableStatus;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.OffsetDateTime;

/**
 * @author chi
 */
@Entity
@Table(name = "page_variable")
public class PageVariable {
    @Id
    @Column(name = "id", length = 36)
    public String id;

    @Column(name = "name", length = 128)
    public String name;

    @Column(name = "status", length = 16)
    @Enumerated(EnumType.STRING)
    public VariableStatus status;

    @Column(name = "fields", columnDefinition = "text")
    public String fields;

    @Column(name = "created_time")
    public OffsetDateTime createdTime;

    @Column(name = "created_by", length = 64)
    public String createdBy;

    @Column(name = "updated_time")
    public OffsetDateTime updatedTime;

    @Column(name = "updated_by", length = 64)
    public String updatedBy;
}
