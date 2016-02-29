@extends('shared.master')

@section('title', 'Create A New Role')

@section('content')
    @include('shared.navbar')
    <div>
        <form method="post">
            
            @foreach ($errors->all() as $error)
                        <p class="alert alert-danger">{{ $error }}</p>
            @endforeach
    
            @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
            @endif
    
            <input type="hidden" name="_token" value="{!! csrf_token() !!}">
    
            <h2>Create a New Role</h2>
            Name: <input type="text" id="name" name="name">
            <br>
            Display Name: <input type="display_name" id="display_name" name="display_name">
            <br>
            Description:
            <input type="textarea" id="description" name="description"/>
            
            <div>
                <button type="reset">Cancel</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>

@endsection

