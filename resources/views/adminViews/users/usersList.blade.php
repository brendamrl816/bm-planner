@extends('shared.master')
@section('title', 'All users')
@section('content')

<div class="mainBackground"><img class="mainBackground-image" src="/pictures/wood.jpg"></div>
        <div class="secondBody">
            
            <div class="barDiv">
                <div style="display:inline-block; height:100%; vertical-align:middle"></div>
                
                <a class="barDiv-logo" style="text-decoration:none; color:white" href="/">
                  <div style="font-size:150%; font-weight:bold; text-shadow: 1px 1px 1px #000000">gmPlanner</div>
                </a>
                
                <div style="display:inline-block; width:100px">
                    <a class="adminLink" href="/admin">
                        <span>Admin Home Page</span>
                    </a>
                </div>
            </div>
            
            <div class="secondBodyDiv">
                
                <h2>ALL USERS</h2>
            
                 @if (session('status'))
                    <div>
                        {{session('status') }}
                    </div>
                @endif
                
                @if ($users->isEmpty())
                    <p> There is no user.</p>
                @else
                
                <div class="tableDiv">
                    <table class="adminTable">
                        <tr class="adminTr">
                            <th class="adminTdR">ID</th>
                            <th class="adminTdR">Name</th>
                            <th class="adminTdR">Email</th>
                            <th class="adminTdR">Joined at</th>
                            <th class="adminTdR">Password</th>
                        </tr>
                        <tbody>
                        @foreach($users as $user)
                            <tr class="adminTr">
                                <td class="adminTd"><div class="adminTd-inside">{!! $user->id !!}</div></td>
                                <td class="adminTd">
                                    <div class="adminTd-inside"><a class="adminLink" href="{!!action('Admin\UsersController@edit', $user->id) !!}"><span>{!! $user->first_name !!}</span></a></div>
                                </td>
                                <td class="adminTd"><div class="adminTd-inside">{!! $user->email !!}</div></td>
                                <td class="adminTd"><div class="adminTd-inside">{!! $user->created_at !!}</div></td>
                                <td class="adminTd"><div class="adminTd-inside">{!! $user->password !!}</div></td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
                    
                 @endif 
        
            </div>
        </div>
 
   
   
            
@endsection
