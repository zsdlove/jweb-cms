import React from "react";
import {Link} from "react-router-dom";
import {Button, Form, Input, Message as notification, Pagination, Table} from "element-react";

const i18n = window.i18n;
export default class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: {
                path: "",
                status: null,
                page: 1,
                limit: 20
            },
            data: {
                total: 0,
                page: 1,
                limit: 20,
                items: []
            },
            limitOptions: [20, 50, 100],
            columns: [
                {type: "selection"},
                {
                    label: i18n.t("page.title"),
                    prop: "title"
                },
                {
                    label: i18n.t("page.path"),
                    prop: "path"
                },
                {
                    label: i18n.t("page.templatePath"),
                    prop: "templatePath"
                },
                {
                    label: i18n.t("page.type"),
                    prop: "type"
                },
                {
                    label: i18n.t("page.status"),
                    prop: "status"
                },
                {
                    label: i18n.t("page.createdTime"),
                    render: function(data) {
                        return (
                            <ElementUI.DateFormatter date={data.createdTime}/>
                        );
                    }
                },
                {
                    label: i18n.t("page.updatedTime"),
                    render: function(data) {
                        return (
                            <ElementUI.DateFormatter date={data.updatedTime}/>
                        );
                    }
                },
                {
                    label: i18n.t("page.action"),
                    fixed: "right",
                    width: 200,
                    render: function(current) {
                        return (
                            <span className="el-table__actions">
                                <Button type="text">
                                    <Link to={{pathname: "/admin/page/template/" + current.id + "/update"}}> {current.type === "DEFAULT" ? i18n.t("page.customize") : i18n.t("page.update")} </Link>
                                </Button>

                                {current.type !== "DEFAULT" &&
                                <Button type="text" onClick={e => this.delete(current, e)}>
                                    {i18n.t("page.delete")}
                                </Button>
                                }
                            </span>
                        );
                    }.bind(this)
                }
            ],
            selected: []
        }
        ;
    }

    componentWillMount() {
        this.find();
    }

    find() {
        fetch("/admin/api/page/template/find", {
            method: "PUT",
            body: JSON.stringify(this.state.query)
        }).then((response) => {
            this.setState({data: response});
        });
    }

    select(list) {
        this.setState({selected: list});
    }

    batchSelect(list) {
        this.setState({selected: list});
    }

    delete(data, e) {
        e.preventDefault();
        fetch("/admin/api/page/template/" + data.id, {method: "DELETE"}).then(() => {
            this.find();
            notification({
                title: i18n.t("page.successTitle"),
                type: "success",
                message: i18n.t("page.deleteSuccessMessage")
            });
        });
    }

    batchDelete(e) {
        e.preventDefault();
        const list = this.state.selected;
        if (list.length === 0) {
            return;
        }
        const ids = [];
        for (let i = 0; i < list.length; i += 1) {
            ids.push(list[i].id);
        }
        fetch("/admin/api/page/template/batch-delete", {
            method: "POST",
            body: JSON.stringify({ids: ids})
        }).then(() => {
            notification({
                title: i18n.t("page.successTitle"),
                type: "success",
                message: i18n.t("page.deleteSuccessMessage")
            });
            this.setState({selected: []});
            this.find();
        });
    }

    queryChange(key, value) {
        this.setState(
            {query: Object.assign(this.state.query, {[key]: value})}
        );
    }

    render() {
        return (
            <div className="page">
                <div className="toolbar">
                    <div className="toolbar-form">
                        <Form inline={true} model={this.state.query}>
                            <Form.Item>
                                <Input icon="fa fa-search" value={this.state.query.path} placeholder={i18n.t("page.pathPlaceHolder")}
                                    onChange={value => this.queryChange("path", value)}/>
                            </Form.Item>
                            <Form.Item>
                                <Button nativeType="button"
                                    onClick={e => this.find(e)}>{i18n.t("page.search")}</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="toolbar-buttons">
                        {this.state.selected.length > 0 ? <Button type="danger" onClick={e => this.batchDelete(e)}
                            nativeType="button">{i18n.t("page.batchDelete")}</Button> : <span></span>}
                        <Link to="/admin/page/template/create">
                            <Button type="primary" nativeType="button">
                                {i18n.t("page.create")}
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="body body--full">
                    <Table
                        stripe={true}
                        style={{width: "100%"}}
                        columns={this.state.columns}
                        data={this.state.data.items}
                        onSelectChange={item => this.select(item)}
                        onSelectAll={list => this.batchSelect(list)}
                    />
                </div>
                <div className="footer">
                    <Pagination layout="total,sizes,prev,pager,next,jumper" total={this.state.data.total}
                        pageSizes={this.state.limitOptions} pageSize={this.state.query.limit}
                        currentPage={this.state.query.page}
                        onSizeChange={(limit) => {
                            this.queryChange("page", 1);
                            this.queryChange("limit", limit);
                            this.find();
                        }}
                        onCurrentChange={(page) => {
                            this.queryChange("page", page);
                            this.find();
                        }}/>
                </div>
            </div>
        );
    }
}