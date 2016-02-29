@extends('shared.master')
@section('title', 'All users')
@section('content')
    @include('shared.navbar')
    <h2>All Users</h2>
    
    @if (session('status'))
        <div>
            {{session('status') }}
        </div>
    @endif
    
    @if ($users->isEmpty())
                <p> There is no user.</p>
    @else
                <table class="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined at</th>

                    </tr>
                    </thead>
                    <tbody>
                    @foreach($users as $user)
                        <tr>
                            <td>{!! $user->id !!}</td>
                            <td>
                                <a href="{!!action('Admin\UsersController@edit', $user->id) !!}">{!! $user->name !!} </a>
                            </td>
                            <td>{!! $user->email !!}</td>
                            <td>{!! $user->created_at !!}</td>
                            <td>{!! $user->password !!}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
    @endif
            
@endsection
