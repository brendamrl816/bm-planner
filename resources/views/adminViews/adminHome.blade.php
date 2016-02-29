@extends('shared.master')
@section('title', 'Admin Control Panel')

@section('content')
    @include('shared.navbar')
    <div></div><a href="/users/logout">Logout</a></div>
    <div class="container">
        <div class="row banner">

            <div class="col-md-12">

                <div class="list-group">
                    <div class="list-group-item">
                        <div class="row-action-primary">
                            <i class="mdi-social-person"></i>
                        </div>
                        <div class="row-content">
                            <div class="action-secondary"><i class="mdi-social-info"></i></div>
                            <h4 class="list-group-item-heading">Manage User</h4>
                                <a href="/admin/users" class="btn btn-default btn-raised">All Users</a>
                        </div>
                    </div>
                    <div class="list-group-separator"></div>
                    <div class="list-group-item">
                        <div class="row-action-primary">
                            <i class="mdi-social-group"></i>
                        </div>
                        <div class="row-content">
                            <div class="action-secondary"><i class="mdi-material-info"></i></div>
                            <h4 class="list-group-item-heading">Manage Roles</h4>
                            <a href="/admin/roles" class="btn btn-default btn-raised">All Roles</a>
                            <a href="/admin/roles/create" class="btn btn-primary btn-raised">Create A Role</a>
                        </div>
                    </div>
                    <div class="list-group-separator"></div>
                </div>

            </div>

        </div>
    </div>

@endsection