/**
 * @author chi
 */
module app.jweb.page.api.impl {
    requires app.jweb.service;
    requires app.jweb.page.api;
    requires app.jweb.database;
    requires app.jweb.message;
    requires app.jweb.scheduler;
    requires org.commonmark;
    requires org.commonmark.ext.autolink;
    requires org.commonmark.ext.gfm.strikethrough;
    requires org.commonmark.ext.gfm.tables;
    requires org.commonmark.ext.heading.anchor;
    requires org.commonmark.ext.ins;

    exports app.jweb.page;
}